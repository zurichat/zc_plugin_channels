import asyncio
from functools import update_wrapper

from django.http.response import HttpResponseBase
from django.utils.cache import cc_delim_re, patch_vary_headers
from django.utils.decorators import classonlymethod
from django.views.decorators.csrf import csrf_exempt

from channel_plugin.utils.custome_response import Response


class AsycViewMixin:
    def get_exception_response(self, exc, request):

        response = self.handle_exception(exc)

        if not getattr(request, "accepted_renderer", None):
            neg = self.perform_content_negotiation(request, force=True)
            request.accepted_renderer, request.accepted_media_type = neg

        response.accepted_renderer = request.accepted_renderer
        response.accepted_media_type = request.accepted_media_type
        response.renderer_context = self.get_renderer_context()

        return response

    def finalize_response(self, request, response, *args, **kwargs):
        """
        Returns the final response object.
        """
        if not asyncio.coroutines.iscoroutine(response):
            # Make the error obvious if a proper response is not returned
            assert isinstance(response, HttpResponseBase), (
                "Expected a `Response`, `HttpResponse` or `HttpStreamingResponse` "
                "to be returned from the view, but received a `%s`" % type(response)
            )

        if isinstance(response, Response):
            if not getattr(request, "accepted_renderer", None):
                neg = self.perform_content_negotiation(request, force=True)
                request.accepted_renderer, request.accepted_media_type = neg

            setattr(response, "accepted_renderer", request.accepted_renderer)
            setattr(response, "accepted_media_type", request.accepted_media_type)
            setattr(response, "renderer_context", self.get_renderer_context())

        # Add new vary headers to the response instead of overwriting.
        if not asyncio.coroutines.iscoroutine(response):
            vary_headers = self.headers.pop("Vary", None)

            if vary_headers is not None:
                patch_vary_headers(response, cc_delim_re.split(vary_headers))

            for key, value in self.headers.items():
                response[key] = value

        return response

    @classonlymethod
    def as_view(cls, actions=None, **initkwargs):
        """
        Because of the way class based views create a closure around the
        instantiated view, we need to totally reimplement `.as_view`,
        and slightly modify the view function that is created and returned.
        """
        # The name and description initkwargs may be explicitly overridden for
        # certain route configurations. eg, names of extra actions.
        cls.name = None
        cls.description = None

        # The suffix initkwarg is reserved for displaying the viewset type.
        # This initkwarg should have no effect if the name is provided.
        # eg. 'List' or 'Instance'.
        cls.suffix = None

        # The detail initkwarg is reserved for introspecting the viewset type.
        cls.detail = None

        # Setting a basename allows a view to reverse its action urls. This
        # value is provided by the router through the initkwargs.
        cls.basename = None

        # actions must not be empty
        if not actions:
            raise TypeError(
                "The `actions` argument must be provided when "
                "calling `.as_view()` on a ViewSet. For example "
                "`.as_view({'get': 'list'})`"
            )

        # sanitize keyword arguments
        for key in initkwargs:
            if key in cls.http_method_names:
                raise TypeError(
                    "You tried to pass in the %s method name as a "
                    "keyword argument to %s(). Don't do that." % (key, cls.__name__)
                )
            if not hasattr(cls, key):
                raise TypeError(
                    "%s() received an invalid keyword %r" % (cls.__name__, key)
                )

        # name and suffix are mutually exclusive
        if "name" in initkwargs and "suffix" in initkwargs:
            raise TypeError(
                "%s() received both `name` and `suffix`, which are "
                "mutually exclusive arguments." % (cls.__name__)
            )

        def view(request, *args, **kwargs):
            self = cls(**initkwargs)

            if "get" in actions and "head" not in actions:
                actions["head"] = actions["get"]

            # We also store the mapping of request methods to actions,
            # so that we can later set the action attribute.
            # eg. `self.action = 'list'` on an incoming GET request.
            self.action_map = actions

            # Bind methods to actions
            # This is the bit that's different to a standard view
            for method, action in actions.items():
                handler = getattr(self, action)
                setattr(self, method, handler)

            self.request = request
            self.args = args
            self.kwargs = kwargs

            # And continue as usual
            return self.dispatch(request, *args, **kwargs)

        # take name and docstring from class
        update_wrapper(view, cls, updated=())

        # and possible attributes set by decorators
        # like csrf_exempt from dispatch
        update_wrapper(view, cls.dispatch, assigned=())

        # We need to set these on the view function, so that breadcrumb
        # generation can pick out these bits of information from a
        # resolved URL.
        view.cls = cls
        view.initkwargs = initkwargs
        view.actions = actions
        view._is_coroutine = asyncio.coroutines._is_coroutine
        return csrf_exempt(view)
