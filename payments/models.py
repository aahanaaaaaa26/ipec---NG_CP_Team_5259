# payments/models.py

from django.db import models
from accounts.models import User

class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=1000.00)

    def __str__(self):
        return f"{self.user.email} - ₹{self.balance}"
