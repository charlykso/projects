from .models import Post
from rest_framework import serializers

# Create your serializers here for data coming from mongodb
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'