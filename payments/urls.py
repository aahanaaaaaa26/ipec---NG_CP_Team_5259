from django.urls import path
from .views import PayRentalView

urlpatterns = [
    path("pay/<int:rental_id>/", PayRentalView.as_view()),
]
