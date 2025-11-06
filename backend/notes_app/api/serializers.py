from rest_framework import serializers
from notes_app.models import Note

class NotesSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model = Note
        exclude = []

class NoteSerializer(NotesSerializer):

    class Meta:
        model = Note
        exclude = ['url']
