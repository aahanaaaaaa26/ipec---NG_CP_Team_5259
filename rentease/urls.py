from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path("admin/", admin.site.urls),

    # JWT Authentication
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # App URLs
    path("api/accounts/", include("accounts.urls")),
    path("api/categories/", include("categories.urls")),
    path("api/items/", include("items.urls")),
    path("api/rentals/", include("rentals.urls")),
    path("api/dashboard/", include("dashboard.urls")),
    path("api/payments/", include("payments.urls")),
]

# Media files (for ImageField)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
