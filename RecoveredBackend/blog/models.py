from django.db import models
from django.conf import settings
User=settings.AUTH_USER_MODEL

from django.utils.text import slugify


def blog_thumbnail_upload_path(instance,filename):
    return f"user_{instance.author.id}/blog_thumbnails/{filename}"


class Blog(models.Model):
    title=models.CharField(max_length=200)
    slug=models.SlugField(unique=True,blank=True)
    content=models.TextField()##full html string from WYSIWG
    thumbnail=models.ImageField(upload_to=blog_thumbnail_upload_path,blank=True,null=True)
    author=models.ForeignKey(User,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)


    def save(self,*args,**kwargs):
        if not self.slug:
            self.slug=slugify(self.title)

        super().save(*args,**kwargs)

    def __str__(self):
        return f"{self.title} by {self.author.username}"        
