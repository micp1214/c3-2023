import request from 'supertest'
import citiesRepository from '../repository/worldCitiesRespository'
import { getAllCitiesUseCase, getCitiesByCountryUseCase, getCitiesByCityNameAndCountryUseCase } from '../../../src/domain/cities/use_cases/getCities'

describe('GET /api/cities', () => {
    test('Debería devolver todos los países disponibles', async () => {
      citiesRepository.getAllCitiesRepository = jest.fn().mockReturnValue(['País1', 'País2', 'País3']);
      const response = await request(app).get('/api/cities');
      expect(response.body).toEqual(['País1', 'País2', 'País3']);
    });
  });
  

describe('GET /api/cities/by_country/:country', () => {
    test('Ddebería retornar verdadero si el input es United Arab Emirates', async () => {
        const country = 'United Arab Emirates"'; // Caso ejemplo
        const response = await request(app).get(`/api/cities/by_country/${country}`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body.every(obj => typeof obj === 'object')).toBe(true);
      });
    });
  

describe('GET /api/cities/by_country/:country', () => {
    test('Debería devolver un mensaje de error cuando no se encuentren Narnia', async () => {
        const country = 'Narnia'; // Caso ejemplo
        const response = await request(app).get(`/api/cities/by_country/${country}`);
        expect(response.status).toBe(200);

        expect(response.body).toEqual({ message: 'No se encontraron ciudades para el país ingresado' });
        });
    });

describe('GET /api/cities/by_country/:country', () => {
    test('Debería devolver un mensaje de error cuando encuentre un valor numerico', async () => {
        const country = 'Chile2';
        const response = await request(app).get(`/api/cities/by_country/${country}`);
        expect(response.status).toBe(400);
      
        expect(response.body).toEqual({ message: 'Solo se aceptan caracteres no numéricos' });
        });
    });

    
describe('GET /api/city/:city/country/:country', () => {
    test('Debería devolver un arreglo de ciudades cuando se encuentren resultados', async () => {
        const city = 'Pietermaritzburg'; // Caso ejemplo
        const country = 'South Africa'; // Caso ejemplo
        const response = await request(app).get(`/api/city/${city}/country/${country}`);
        expect(response.status).toBe(200);
    
        expect(Array.isArray(response.body)).toBe(true);
    
        expect(response.body.length).toBeGreaterThan(0);
        expect(typeof response.body[0]).toBe('object');
      });
    });

describe('GET /api/city/:city/country/:country', () => {
    test('Debería devolver mensaje cuando no se encuentren ciudades en el pais falso', async () => {
        const city = 'Barcelona'; // Caso ejemplo
        const country = 'Narnia'; // Caso ejemplo
        const response = await request(app).get(`/api/city/${city}/country/${country}`);      
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
    
        expect(response.body.message).toBe('No se encontraron ciudades para el país ingresado');
        });
      });


describe('GET /api/city/:city/country/:country', () => {
    test('Debería devolver  mensaje de error con Chile2', async () => {
        const city = 'Santiago'; // Caso ejemplo
        const country = 'Chile2'; // Caso ejemplo
        const response = await request(app).get(`/api/city/${city}/country/${country}`);
        expect(response.status).toBe(400);
        expect(typeof response.body).toBe('object');
    
        expect(response.body.message).toBe('Solo se aceptan caracteres no numéricos');
      });
    });

describe('Endpoints con parámetros', () => {
    const testEndpoints = [
        '/api/cities',
        '/api/cities/by_country/:country',
        '/api/city/:city/country/:country'
        ];
      
        testEndpoints.forEach((endpoint) => {
          test(`Debería devolver un objeto de mensaje cuando el parámetro tenga una longitud menor a 3 (${endpoint})`, async () => {
            const parameter = '2'; 
            const response = await request(app).get(endpoint.replace(':parameter', parameter));
            expect(response.status).toBe(400);
            expect(typeof response.body).toBe('object');
      
            expect(response.body.message).toBe('El país/ciudad ingresado debe tener al menos 3 caracteres');
          });
        });
      });