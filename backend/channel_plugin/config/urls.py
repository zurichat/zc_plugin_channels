from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.shortcuts import render
from django.urls import include, path, re_path
from django.views import defaults as default_views
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Zuri Chat Channel Plugin Endpoints",
        default_version=f"{settings.BASE_URL}",
        description="Made By Team Coelho",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="team-coelho@zuri.chat"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
    validators=["ssv"],
)


def render_react(request):
    return render(request, "root/dist/index.html")


urlpatterns = [
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    re_path(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    re_path(
        r"^docs/v1/$",
        schema_view.with_ui("redoc", cache_timeout=0),
        name="schema-redoc",
    ),
    # Django Admin, use {% url 'admin:index' %}
    path(settings.ADMIN_URL, admin.site.urls),
    # User management
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
if settings.DEBUG:
    # Static file serving when using Gunicorn +
    #  Uvicorn for local web socket development
    urlpatterns += staticfiles_urlpatterns()

# API URLS
urlpatterns += [
    # API base url
    path("api/v1/", include("channel_plugin.info.urls")),
    path("api/v1/", include(("apps.channels.urls", "channels"))),
    path("api/v1/", include(("apps.channelmembers.urls", "channels"))),
    path("api/v1/", include(("apps.channelmessages.urls", "channelmessages"))),
    path("api/v1/", include(("apps.roles.urls", "roles"))),
    path("api/v1/", include(("apps.threads.urls", "threads"))),
    path("api/v1/", include(("apps.googlemeet.urls", "googlemeet"))),
    path("api/v1/", include(("apps.centri.urls", "centri"))),
    path("", include(("apps.syncApp.urls", "syncApp"))),
    path("", include(("apps.tests.urls", "test"))),
]

handler500 = "rest_framework.exceptions.server_error"
handler400 = "rest_framework.exceptions.bad_request"

# FRONT END URLS
urlpatterns += [
    re_path(r"^$", render_react),
    re_path(r"^(?:.*)/?$", render_react),
]

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
