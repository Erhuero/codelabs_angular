import { HttpInterceptorFn } from '@angular/common/http';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(`La requete est en cours d\'execution sur l\'adresse ${req.url}`)
  const authReq =  req.clone({
    headers: req.headers.set('Authorization', 'Bearer the token'),
  })
  return next(authReq);
};
