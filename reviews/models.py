from django.db import models
from accounts.models import User
from rentals.models import Rental

class Review(models.Model):
    rental = models.OneToOneField(Rental, on_delete=models.CASCADE)

    from_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="given_reviews"
    )

    to_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="received_reviews"
    )

    rating = models.IntegerField()
    comment = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.from_user.email} → {self.to_user.email}"
