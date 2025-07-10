from rest_framework import serializers
from .models import Blog
from django.utils.text import slugify

class BlogSerializer(serializers.Serializer):
    id=serializers.IntegerField(read_only=True)
    title=serializers.CharField(max_length=200)
    slug=serializers.CharField(read_only=True)
    content=serializers.CharField()
    thumbnail=serializers.ImageField(required=False,allow_null=True,read_only=True)
    author_id=serializers.IntegerField(read_only=True)
    author_username=serializers.CharField(read_only=True)
    created_at=serializers.DateTimeField(read_only=True)

    #Field-level validation
    def validate_title(self,value):
        if len(value.strip())<5:
            raise serializers.ValidationError("Title must be at least 5 characters long.")
        
        return value
    
    def validate_content(self,value):
        if not value.strip():
            raise serializers.ValidationError("Content cannot be empty.")
        
        if len(value)<20:
            raise serializers.ValidationError("Content is too short to be a blog post.")

        return value
    
    #Object-level validation
    def validate(self,data):
        #Example : disallow vulgar content in title
        if 'fuck' in data.get('title','').lower():
            raise serializers.ValidationError("Vulgar words are not allowed ")
        return data
    
    #Create new blog object
    def create(self,validated_data):
        request=self.context.get('request')
        user=request.user if request else None
        thumbnail=request.FILES.get('thumbnail') if request else None

        blog=Blog.objects.create(
            title=validated_data['title'],
            content=validated_data['content'],
            thumbnail=thumbnail,
            author=user
        )
        return blog
    ##Custom response output
    def to_representation(self, instance):
        request=self.context.get('request')
        thumbnail_url=None
        if instance.thumbnail:
            if request:
                thumbnail_url=request.build_absolute_uri(instance.thumbnail.url)
            else:
                thumbnail_url=instance.thumbnail.url   

        return{
            "id":instance.id,
            "title":instance.title,
            "slug":instance.slug,
            "content":instance.content,
            "thumbnail":thumbnail_url,
            "author_id":instance.author.id,
            "author_username":instance.author.username,
            "created_at":instance.created_at,
           
        }
    
    ##Update existing blog object
    def update(self,instance,validated_data):
        instance.title=validated_data.get('title',instance.title)
        instance.content=validated_data.get('content',instance.content)

        request=self.context.get('request')

        if request and request.FILES.get('thumbnail'):
            instance.thumbnail=request.FILES.get('thumbnail')
        
        # if 'thumbnail' in validated_data:
        #     instance.thumbnail=validated_data.get('thumbnail',instance.thumbnail)

        #Optional: regenerate slug if title changes
        if 'title' in validated_data:
            instance.slug=slugify(validated_data['title'])

        instance.save()
        return instance
    
    def save(self,**kwargs):
        if self.instance:
            return self.update(self.instance,self.validated_data)
        return self.create(self.validated_data)

    