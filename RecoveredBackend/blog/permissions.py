from rest_framework.permissions import BasePermission

class IsEditorOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return(
            request.user and request.user.is_authenticated and (
                request.user.is_staff or getattr(request.user,'is_editor',False)
            )
        )