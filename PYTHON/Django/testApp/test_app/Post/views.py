from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Post
from users.models import User

# Create your views here.

@api_view(['GET'])
def getPosts(request):
    posts = Post.objects.all()
    data = []
    for post in posts:
        data.append({
            'title': post.title,
            'content': post.content,
            'created_at': post.created_at,
            'updated_at': post.updated_at
        })
    return Response(data, status=status.HTTP_200_OK)

@api_view(['POST'])
def createPost(request):
    try:
        user = User.objects.get(pk=request.data['user'])
        post = Post(user = user, title=request.data['title'], content=request.data['content'])
        post.save()
        return Response("Post created successfully", status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)