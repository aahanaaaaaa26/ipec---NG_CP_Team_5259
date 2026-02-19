# rentals/models.py

from django.db import models
from accounts.models import User
from items.models import Item

class Rental(models.Model):

    REQUESTED = "requested"
    APPROVED = "approved"
    ACTIVE = "active"
    COMPLETED = "completed"
    REJECTED = "rejected"

    STATUS_CHOICES = [
        (REQUESTED, "Requested"),
        (APPROVED, "Approved"),
        (ACTIVE, "Active"),
        (COMPLETED, "Completed"),
        (REJECTED, "Rejected"),
    ]

    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    renter = models.ForeignKey(User, on_delete=models.CASCADE)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=REQUESTED)

    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    commission = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    payment_completed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('item', 'renter')

    def __str__(self):
        return f"{self.item.title} - {self.status}"
    
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name="rentals")
renter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="rentals")

