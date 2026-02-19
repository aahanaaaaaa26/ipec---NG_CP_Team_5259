from django.urls import path
from .views import RentalRequestView, RentalActionView, OwnerRentalRequestsView
from .views import RenterActiveRentalsView


urlpatterns = [
    path("request/<int:item_id>/", RentalRequestView.as_view()),
    path("action/<int:rental_id>/", RentalActionView.as_view()),
    path("owner/requests/", OwnerRentalRequestsView.as_view()),
    path("renter/active/", RenterActiveRentalsView.as_view()),

]
