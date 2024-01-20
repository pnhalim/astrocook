from django.urls import include, path
from rest_framework import routers

from django_api.quickstart import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/convert/', views.ConvertView.as_view(), name='convert_units'),
    path('api/recipe/', views.RecipeView.as_view(), name='recipe'),
]

urlpatterns += router.urls