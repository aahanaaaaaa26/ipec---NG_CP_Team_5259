from django.urls import path
from .views import SignupView, LoginView, UserProfileView


urlpatterns = [
    path("signup/", SignupView.as_view()),
    path("login/", LoginView.as_view()),
     path("profile/", UserProfileView.as_view()),
]
