from rest_framework import viewsets, permissions, filters
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Item
from .serializers import ItemSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()   # 👈 ADD THIS LINE
    serializer_class = ItemSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        queryset = super().get_queryset()

        owner = self.request.query_params.get("owner")
        is_available = self.request.query_params.get("is_available")

        if owner == "me":
            queryset = queryset.filter(owner=self.request.user)

        if is_available is not None:
            queryset = queryset.filter(
                is_available=is_available.lower() == "true"
            )

        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
