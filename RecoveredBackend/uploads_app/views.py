from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import uuid,os
from django.conf import settings

class ImageUploadAPIView(APIView):
    parser_classes=[MultiPartParser,FormParser]
    permission_classes=[IsAuthenticated]

    def post(self,request):
        image=request.FILES.get('image')
        if not image:
            return Response({"detail":"No image provided"},status=400)
        
        user=request.user
        ext=os.path.splitext(image.name)[1]
        filename=f"{uuid.uuid4().hex}{ext}"
        path=os.path.join(f"user_{user.id}","uploads",filename)

        full_path=os.path.join(settings.MEDIA_ROOT,path)
        os.makedirs(os.path.dirname(full_path),exist_ok=True)

        try:
            with open(full_path,'wb+') as f:
                for chunk in image.chunks():
                    f.write(chunk)
                image_url=request.build_absolute_uri(settings.MEDIA_URL+path)
            return Response({"url":image_url},status=status.HTTP_201_CREATED) 

        except Exception as e:
            #Cleanup junk file if error happens
            if os.path.exists(full_path):
                os.remove(full_path)   
            return Response({"error":"Upload failed","detail":str(e)},status=500)    









