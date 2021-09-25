from dataclasses import dataclass


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
        output = False

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
        output = False

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
        output = False

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
        output = False
        
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
        output = False

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

