import json
from copy import copy


class OrderMixin:
    """
        This class is a mixin for applying
        ordering to List endpoints

        HOW TO USE:
        -----------
        Inherit the class in your view class
        at anypoint where you ping zc-core and want to use 
        query_params use the _clean_query_params(request) method of this
        class instead to get the query params
        -
        once you are done processing your payload pass it through the
        perform_ordering(request, payload:list)
        method of the class to order the payload by the users parameters

        HOW DOES THE USER USE THIS METHOD
        ---------------------------------
        to perform ordering on a payload a user has to pass the
        order_by=parameter to the requests query parameters

        Ordering On Nested Data
        -----------------------
        Ordering can be applied on Nested data by using double underscore
        e.g order a payload by some data channel.members.date_added
        the query parameter must be passed as order_by=members__date_added

        You can View an example on applying this mixin on apps/channels/views.py
        ChannelViewSet.channel_all
    """


    """
        PARAMETERS
        ----------

        OrderingFields
        --------------
        a dict whose keys->str , represent fields allowed for ordering
        and the values->callable is a function that converts the value to a
        comparable type example { "timestamp"; datetime.fromisoformat} 
    """

    Query = "order_by"
    Dquery = "ascending" #sho
    OrderingFields = {} #contans allowed ordering fields 

    Queryset = []

    def _get_queryset(self):
        return getattr(self, "Queryset", [])
    
    def _clean_query_params(self, request):
        """
            This  method is used to remove the ordering query params
            so as to avoid sending them as filters to zc-core
        """
        params = dict(request.query_params)
        params.pop(self.Query, None)
        params.pop(self.Dquery, None)
        return params
    
    def parse_field_to_path(self, key):
        return key.split("__")

    def _get_value(self, obj:dict, path:list, converter=None):
        temp = copy(obj)
        value = None

        for param in path:
            try:
                value = temp.get(param)
            except:
                value = None
                break
            else:
                temp = value
        
        
        if converter:
            
            try:
                value = converter(value)
            except:
                pass
        
        return value

    def partition(self, path:list, converter, array:list, low:int, high:int):
        pivot = self._get_value(array[high], path, converter)

        i = low - 1

        for j in range(low, high):
            try:
                if self._get_value(array[j], path, converter) <= pivot:

                    i = i + 1

                    (array[i], array[j]) = (array[j], array[i])
            except TypeError:
                pass
        (array[i + 1], array[high]) = (array[high], array[i + 1])
        return i + 1

    def quick_sort(self, path:list, converter:None, array:list, low:int, high:int):        
        if low < high:
            pi = self.partition(path, converter, array, low, high)
            self.quick_sort(path, converter, array, low, pi - 1)
            self.quick_sort(path, converter, array, pi + 1, high)

    def _order_queryset(self, by:str, ascending=True) -> list:
        queryset = copy(self._get_queryset())
        assert (type(by)==str), " 'by'  must be of type string"
        assert by in self.OrderingFields.keys(), "can not perform order by this key as it is not in the ordering fields"
        converter = self.OrderingFields.get(by)
        path = self.parse_field_to_path(by)
        self.quick_sort(path, converter, queryset, 0, len(queryset) - 1)
        print(queryset)
        return queryset if ascending else queryset[::-1]

    def perform_ordering(self, request, payload:list):
        by = request.query_params.get(self.Query, None)
        direction = json.loads(request.query_params.get(self.Dquery, "true"))
        self.Queryset = payload        
        if by:
            try:
                return self._order_queryset(by, direction)
            except:
                pass
        return payload


class FilterWrapper:
    
    """
        This class acts as a containaer for methods 
        required to perform basic filtering on a list of objects
        to use this class you can call its methods directly since they 
        are static. Or you can inherit its methods.
        This class _filter method that dose the filtering assumes each object
        is a dict so if you want to filter other types of objects you should
        overide this method.

        Note:
        ------------

        for more advanced filtering add these checkers in front of your parameter

        '$': 'startswith',
        '#': 'endswith',
        '*': 'contains',
        '>': 'greaterthan',
        '<': 'lessthan'

    """

    CHECKERS = ['$','#','*', '>', '<']
 
    @staticmethod
    def _filter_exact(obj:dict, params:dict):
        flag = 0
        output = True

        for param in params.items():
            if param in list(obj.items()):
                flag += 1
            else:
                break
        
        if flag == len(list(params.items())):
            output = True
        return output

    @staticmethod
    def _filter_partial(obj:dict, params:dict):
        checkers =  {
            '$': FilterWrapper._startswith,
            '#': FilterWrapper._endswith,
            '*': FilterWrapper._contains,
            '>': FilterWrapper._greater,
            '<': FilterWrapper._less
        }

        flag = 0
        output = True

        for param in params.items():
            
            try:
                key = param[0]
                chk_class = checkers.get(key[0], None)
                assert chk_class is not None
            except AssertionError:
                continue
            
            flag += 1 if chk_class(obj, param) else 0
        
        if flag == len(params) :
            output = True
        return output

    @staticmethod
    def _startswith(obj:dict, param:tuple):
        output = True

        key = param[0]

        try:
            val = obj[key[1:]]
            comp = param[1]
            assert type(val) == str
            assert type(comp) == str
            output = val.lower().startswith(comp.lower())
        except AssertionError:
            pass
        return output

    @staticmethod
    def _endswith(obj:dict, param:tuple):
        output = True
        
        key = param[0]

        try:
            val = obj[key[1:]]
            comp = param[1]
            assert type(val) == str
            assert type(comp) == str
            output = val.lower().endswith(comp.lower())
        except AssertionError:
            pass
        return output

    @staticmethod
    def _contains(obj:dict, param:tuple):
        output = True

        key = param[0]

        try:
            output = param[1] in obj.get(key[1:])
        except TypeError:
            pass
        return output

    @staticmethod
    def _greater(obj:dict, param:tuple):

        # removes the cheker sign from the key
        key = param[0]
        return obj.get(key[1:]) > param[1] 
    
    @staticmethod
    def _less(obj:dict, param:tuple):

        # removes the cheker sign from the key
        key = param[0]
        return obj.get(key[1:]) < param[1]

    @staticmethod
    def get_partial(params:dict):
        checker = FilterWrapper.CHECKERS
        output = params.copy()
        
        # get partial filter params
        for param in params.keys():
            if (param[0] not in checker):
                del output[param]
        return output
    
    @staticmethod
    def get_exact(params:dict):
        checker = FilterWrapper.CHECKERS
        output = params.copy()
        
        # get partial filter params
        for param in params.keys():
            if (param[0] in checker):
                del output[param]
        return output

    @staticmethod
    def filter_params(allowed:list, params:dict) -> dict:
        """
            This method removes all parameters
            not allowed in the filtering process
            
            parameters:
            --------------------
            allowed:list|tuple|set
                A list of allowed parameters to filter by
                elements in the list should be immutable and
                can be used as a dict's key
            params:dict
                A dict with its keys as propertise to filter by
                and its values as the value of the property
            
            return:dict
            ----------
                Returns params dict with non allowes items removed
        """
        keys = []
        
        # get allowed keys in parameter
        for param in params.keys():
            if (param[0] in FilterWrapper.CHECKERS):
                if param[1:] in allowed:
                    keys.append(param)
            else:
                if param in allowed:
                    keys.append(param)

        # remove unwanted keys
        list(
            map(
                lambda p: params.pop(p) if p not in keys else params,
                list(params.keys())
            )
        )

        return params

    @staticmethod
    def filter_objects(data:list, params:dict):
        """
            This method filters a list by a set of parameters  
            
            parameters:
            --------------------
                data:list
                    A list of similar objects that needs to be filtered
                params:dict
                    A dict with its keys as propertise to filter by
                    and its values as the value of the property
            
            return:list
            ----------
                Returns a filtered list
        """ 
        partial_params = FilterWrapper.get_partial(params)
        exact_params = FilterWrapper.get_exact(params)
        output =  []
        
        if params:
            for obj in data:
                if FilterWrapper._filter_partial(obj, partial_params):
                    if obj not in output:
                        output.append(obj)
                    
                    for obj in output:
                        if not FilterWrapper._filter_exact(obj, exact_params):
                            output.remove(obj)

            return output
        return data
