from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Comment

# Create your views here.

@api_view(['GET'])
def getComments(request):
    comments = Comment.objects.all()
    data = []
    for comment in comments:
        data.append({
            'user': comment.user.username,
            'post': comment.post.title,
            'content': comment.content,
            'created_at': comment.created_at,
            'updated_at': comment.updated_at
        })
    return Response(data, status=status.HTTP_200_OK)