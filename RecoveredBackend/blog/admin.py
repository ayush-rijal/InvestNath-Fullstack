from django.contrib import admin
from .models import Blog

class BlogAdmin(admin.ModelAdmin):
    fields=['title','slug','content','thumbnail','author','created_at']



admin.register(Blog,BlogAdmin,)