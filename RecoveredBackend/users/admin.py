"""Admin configuration for CustomUser model."""
from django.contrib import admin
from .models import CustomUser

class CustomUserAdmin(admin.ModelAdmin):
    fields=['email','user_id','is_editor','is_superuser']



admin.register(CustomUser,CustomUserAdmin)