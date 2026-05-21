import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  
  const jwt = localStorage.getItem('jwt')
  
  if (jwt) {
    // on clone la requête et on ajoute en entête le jwt
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt}`
      }
    })
  }

  return next(req);
};
