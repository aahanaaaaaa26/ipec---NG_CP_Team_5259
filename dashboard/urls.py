from django.urls import path
from .views import OwnerDashboardView , RenterDashboardView

urlpatterns = [
    path("owner/", OwnerDashboardView.as_view()),
    path("renter/", RenterDashboardView.as_view()),
]
