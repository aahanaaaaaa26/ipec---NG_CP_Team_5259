from rest_framework import serializers
from .models import User

ALLOWED_DOMAINS = [
    "ipec.org.in",
]



# accounts/serializers.py

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # Change 'college' to 'college_name' here
        fields = ["email", "password", "full_name", "college_name"]

    def validate_email(self, email):
        domain = email.split("@")[-1]
        if domain not in ALLOWED_DOMAINS:
            raise serializers.ValidationError("Only college email allowed")
        return email