from rest_framework import serializers
from notes_app.models import Note

class NotesSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = Note
        fields = ['url', 'id', 'title', 'content', 'type', 'marked']

class NoteSerializer(NotesSerializer):

    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'type', 'marked']

