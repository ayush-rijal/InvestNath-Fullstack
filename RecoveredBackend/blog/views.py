from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from .models import Blog
from .serializers import BlogSerializer
from .permissions import IsEditorOrAdmin
from rest_framework import status
from django.shortcuts import get_object_or_404


class BlogListCreateAPIView(APIView):
    permission_classes=[IsAuthenticatedOrReadOnly]

    def get(self,request):
        blogs=Blog.objects.all().order_by('-created_at')
        serializer=BlogSerializer(blogs,many=True,context={'request':request})
        return Response(serializer.data)
    
    def post(self,request):
        ##Debug : Print token header and user info
        print("Authorization header:",request.headers.get('Authorization'))
        print("request.user",request.user)
        print("request.user.is_authenticated",request.user.is_authenticated)
        print("🔍 request.user.is_editor:", getattr(request.user, 'is_editor', 'NOT PRESENT'))

        print(request.headers.get('Authorization'))
        if not IsEditorOrAdmin().has_permission(request,self):
            return Response({"detail":"Permission denied"},status=403)
        
        serializer=BlogSerializer(data=request.data,context={'request':request})
        if serializer.is_valid():
            blog=serializer.save()
            output=BlogSerializer(blog).data
            return Response(output,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlogDetailUpdateDeleteAPIView(APIView):
    permission_classes=[IsAuthenticatedOrReadOnly]

    def get_object(self,slug):
        return get_object_or_404(Blog,slug=slug)
    
    def get(self,request,slug):
        blog=self.get_object(slug)
        serializer=BlogSerializer(blog,context={'request':request})
        return Response(serializer.data)
    
    def put(self,request,slug):
        blog=self.get_object(slug)

        if not IsEditorOrAdmin().has_permission(request,self):
            return Response({"detail":"Permission denied"},status=403)
        
        serializer=BlogSerializer(blog,data=request.data,context={'request':request})
        if serializer.is_valid():
            blog=serializer.save()
            return Response(BlogSerializer(blog).data)

    def delete(self,request,slug):
        blog=self.get_object(slug)

        if not (request.user.is_staff or blog.author==request.user):
            return Response({"detail":"Only admin or author can delete "},status=403)
        
        blog.delete()
        return Response({"detail":"Deleted"},status=status.HTTP_204_NO_CONTENT)

    
