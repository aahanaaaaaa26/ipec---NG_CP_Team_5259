from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from rentals.models import Rental
from .models import Wallet


class PayRentalView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, rental_id):

   
        try:
            rental = Rental.objects.get(id=rental_id)
        except Rental.DoesNotExist:
            return Response(
                {"error": "Rental not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if rental.renter != request.user:
            return Response(
                {"error": "Not allowed"},
                status=status.HTTP_403_FORBIDDEN
            )


        wallet, created = Wallet.objects.get_or_create(
            user=request.user,
            defaults={"balance": 1000}   
        )

        amount = rental.item.price

      
        if wallet.balance < amount:
            return Response(
                {"error": "Insufficient balance"},
                status=status.HTTP_400_BAD_REQUEST
            )

        wallet.balance -= amount
        wallet.save()

        
        rental.status = Rental.ACTIVE
        rental.save()

        return Response({
            "message": "Payment successful",
            "remaining_balance": wallet.balance
        }, status=status.HTTP_200_OK)
