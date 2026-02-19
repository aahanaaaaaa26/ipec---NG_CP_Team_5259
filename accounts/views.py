from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from .serializers import SignupSerializer
from .models import User




class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]

            # Create user directly (ACTIVE = TRUE)
            user, created = User.objects.update_or_create(
                email=email,
                defaults={
                    "full_name": serializer.validated_data.get("full_name"),
                    "college_name": serializer.validated_data.get("college_name"),
                    "is_active": True,  # ✅ Directly active
                    "college_domain": email.split("@")[-1],
                },
            )

            user.set_password(password)
            user.save()

            return Response(
                {"message": "Signup successful"},
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, email=email, password=password)

        if user is None:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not user.is_active:
            return Response(
                {"error": "Account not verified. Please verify OTP."},
                status=status.HTTP_403_FORBIDDEN,
            )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
                "email": user.email,
            },
            status=status.HTTP_200_OK,
        )

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "email": request.user.email,
            "full_name": request.user.full_name,
            "college": request.user.college_name
        })
