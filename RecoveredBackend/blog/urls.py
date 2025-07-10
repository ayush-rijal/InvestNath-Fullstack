from blog.views import BlogListCreateAPIView,BlogDetailUpdateDeleteAPIView
from django.urls import path


urlpatterns = [
path('blogs/',BlogListCreateAPIView.as_view(),name='blog-list-create'),
path('blogs/<slug:slug>/',BlogDetailUpdateDeleteAPIView.as_view(),name='blog-detail-update-delete')
]
