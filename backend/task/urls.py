from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, CustomTokenObtainPairView, CustomRefreshTokenView, logout, is_authenticated, register
router = DefaultRouter()
router.register('tasks', TaskViewSet, basename='task')

urlpatterns = [
        path('', include(router.urls)),
        path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
        path('token/refresh/', CustomRefreshTokenView.as_view(), name='token_refresh'),
        path('logout/', logout),
        path('authenticated/', is_authenticated),
        path('register/', register),
]
