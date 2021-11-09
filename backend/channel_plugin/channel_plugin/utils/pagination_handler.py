
from typing import OrderedDict
from rest_framework import pagination
from rest_framework.response import Response


class SearchPagination(pagination.PageNumberPagination):
    def get_last_page(self,count,size):
        if size > count:
            return 1
        return count // size
    
    
    def get_paginated_response(self, data, query, filters, request):
        pagination_dict = OrderedDict([
            ('total_results', self.page.paginator.count),
            ('page_size', self.get_page_size(request)),
            ('current_page', self.get_page_number(request, self.page.paginator)),
            ('first_page', 1),
            ('last_page',self.get_last_page(self.page.paginator.count, self.get_page_size(request))),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()), 
        ])
        
        search_parameters = OrderedDict([
            ('query', query),
            ('filters',filters),
            ('plugin',"Channels")
        ])
        
        results = OrderedDict([
            ("entity","message"),
            ("data",(data))
        ])
        
        return Response(OrderedDict([
            ('status', "ok"),
            ('title',"Channels Search"),
            ('description','Results for Channels'),
            ('pagination',pagination_dict), 
            ('search_parameters',search_parameters),
            ('results', results),            
        ]))