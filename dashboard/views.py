from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from items.models import Item
from rentals.models import Rental
from items.serializers import ItemSerializer
from rentals.serializers import RentalSerializer


class OwnerDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        owner = request.user

        my_items = Item.objects.filter(owner=owner)

        pending_requests = Rental.objects.filter(
            item__owner=owner,
            status=Rental.REQUESTED
        )

        active_rentals = Rental.objects.filter(
            item__owner=owner,
            status=Rental.APPROVED
        )

        completed_rentals = Rental.objects.filter(
            item__owner=owner,
            status=Rental.COMPLETED
        )

        data = {
            "my_items": ItemSerializer(my_items, many=True).data,
            "pending_requests": RentalSerializer(pending_requests, many=True).data,
            "active_rentals": RentalSerializer(active_rentals, many=True).data,
            "completed_rentals": RentalSerializer(completed_rentals, many=True).data,
        }

        return Response(data)

from rentals.models import Rental
from rentals.serializers import RentalSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response


class RenterDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        renter = request.user

        requested_rentals = Rental.objects.filter(
            renter=renter,
            status=Rental.REQUESTED
        )

        active_rentals = Rental.objects.filter(
            renter=renter,
            status=Rental.APPROVED
        )

        completed_rentals = Rental.objects.filter(
            renter=renter,
            status=Rental.COMPLETED
        )

        data = {
            "requested": RentalSerializer(requested_rentals, many=True).data,
            "active": RentalSerializer(active_rentals, many=True).data,
            "completed": RentalSerializer(completed_rentals, many=True).data,
        }

        return Response(data)
