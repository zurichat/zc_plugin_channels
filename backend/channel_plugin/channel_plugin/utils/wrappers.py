from dataclasses import dataclass

from django.core.exceptions import NON_FIELD_ERRORS


@dataclass
class OrderingWrapper:
    

    
    pass



class FilterWrapper:
    
    """
        This class acts as a containaer for methods 
        required to perform basic filtering on a list of objects
        to use this class you can call its methods directly since they 
        are static. Or you can inherit its methods.
        This class _filter method that dose the filtering assumes each object
        is a dict so if you want to filter other types of objects you should
        overide this method.
    """
    CHECKERS = {
        '$': 'startswith',
        '#': 'endswith',
        '*': 'contains',
        '>': 'greaterthan',
        '<': 'lessthan'
    }


    @staticmethod
    def _filter_exact(obj:dict, params:dict):
        flag = 0
        out = False
        
        for param in params.items():
            if param in obj.items():
                flag += 1
            else:
                break

        if flag == len(list(params.items())):
            out = True
        return out


    @staticmethod
    def _filter_partial(obj:dict, params:dict):
        checkers =  {
            '$': FilterWrapper._startswith,
            '#': FilterWrapper._endswith,
            '*': FilterWrapper._contains,
            '>': FilterWrapper._greater,
            '<': FilterWrapper._less
        }

    @staticmethod
    def _startswith():
        pass

    @staticmethod
    def _endswith(obj:dict, param:tuple):
        val = obj[param[0]]
        comp = obj[param[1]]
        assert type(val) == str
        assert type(comp) == str

    @staticmethod
    def _contains(obj:dict, param:tuple):
        output = False
        
        try:
            output = param[1] in obj.get(param[0])
        except TypeError:
            pass
        return output

    @staticmethod
    def _greater(obj:dict, param:tuple):
        return obj.get(param[0]) > param[1] 
    
    @staticmethod
    def _less(obj:dict, param:tuple):
        return obj.get(param[0]) < param[1]    

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
        keys = list(filter(lambda param: bool(param in allowed), params.keys()))
        
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
        if params:
            for obj in data:
                (
                    data.remove(obj)
                    if FilterWrapper._filter_exact(obj, params)
                    else None
                )
                
        return data

