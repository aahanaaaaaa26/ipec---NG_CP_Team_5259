from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Rental
from .serializers import RentalSerializer
from items.models import Item

from decimal import Decimal
from rest_framework.response import Response
from rest_framework import status


class RentalRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, item_id):

        item = get_object_or_404(Item, id=item_id)

        # ❌ Owner cannot rent own item
        if item.owner == request.user:
            return Response(
                {"error": "You cannot rent your own item."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ❌ Not available
        if not item.is_available:
            return Response(
                {"error": "Item is not available."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # ❌ Duplicate request
        if Rental.objects.filter(item=item, renter=request.user).exists():
            return Response(
                {"error": "You already requested this item."},
                status=status.HTTP_400_BAD_REQUEST
            )

        rental = Rental.objects.create(
            item=item,
            renter=request.user,
            status=Rental.REQUESTED
        )

        return Response(
            RentalSerializer(rental).data,
            status=status.HTTP_201_CREATED
        )


class RentalActionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, rental_id):

        rental = get_object_or_404(Rental, id=rental_id)

        # Only owner can approve/reject
        if rental.item.owner != request.user:
            return Response(
                {"error": "Not allowed"},
                status=status.HTTP_403_FORBIDDEN
            )

        action = request.data.get("action")

        if action == "approve":
            rental.status = Rental.APPROVED
            rental.item.is_available = False
            rental.item.save()

        elif action == "reject":
            rental.status = Rental.REJECTED

        elif action == "complete":
            rental.status = Rental.COMPLETED
            rental.item.is_available = True
            rental.item.save()

        rental.save()
        return Response(RentalSerializer(rental).data)

class OwnerRentalRequestsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        rentals = Rental.objects.filter(
            item__owner=request.user,
            status=Rental.REQUESTED
        )

        data = [
            {
                "id": rental.id,
                "item": rental.item.title,
                "renter": rental.renter.email,
            }
            for rental in rentals
        ]

        return Response(data)

class RenterActiveRentalsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        rentals = Rental.objects.filter(
            renter=request.user,
            status=Rental.APPROVED
        )

        data = [
            {
                "id": rental.id,
                "item": rental.item.title,
                "price": rental.item.price,
                "image": rental.item.image.url if rental.item.image else None,
            }
            for rental in rentals
        ]

        return Response(data)
    
    
