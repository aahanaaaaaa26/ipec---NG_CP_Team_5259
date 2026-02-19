from django.contrib import admin
from .models import Item


class ItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'category', 'price', 'is_available']
    list_filter = ['category', 'is_available']


admin.site.register(Item, ItemAdmin)
