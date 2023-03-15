import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { AuthDto } from '../src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { CreateBookmarkDto } from 'src/bookmark/dto';

describe('app-e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    // now that we got the module compiled, we can run the app as test
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    prisma = app.get(PrismaService);
    await prisma.cleanDB();
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  afterAll(() => {
    app.close();
  });
  // describe('Auth', () => {
  //   const dto: AuthDto = {
  //     email: 'omri@gmail.com',
  //     password: '12345',
  //   };
  //   describe('SignUp', () => {
  //     it('should throw; email empty', () => {
  //       return pactum
  //         .spec()
  //         .post('/auth/signup')
  //         .withBody({ password: dto.password })
  //         .expectStatus(400);
  //     });

  //     it('should throw; password empty', () => {
  //       return pactum
  //         .spec()
  //         .post('/auth/signup')
  //         .withBody({ email: dto.email })
  //         .expectStatus(400);
  //     });
  //     it('should signup', () => {
  //       return pactum
  //         .spec()
  //         .post('/auth/signup')
  //         .withBody(dto)
  //         .expectStatus(403);
  //     });
  //   });

  //   describe('SignIn', () => {
  //     it('should throw; email empty', () => {
  //       return pactum
  //         .spec()
  //         .post('/auth/signin')
  //         .withBody({ password: dto.password })
  //         .expectStatus(400);
  //     });

  //     it('should throw; password empty', () => {
  //       return pactum
  //         .spec()
  //         .post('/auth/signin')
  //         .withBody({ email: dto.email })
  //         .expectStatus(400);
  //     });

  //     it('should signin', () => {
  //       return pactum
  //         .spec()
  //         .post('/auth/signin')
  //         .withBody(dto)
  //         .expectStatus(200)
  //         .stores('userAt', 'access_token'); //stores the result data in with pactum for further tests
  //     });
  //   });
  //   describe('User', () => {
  //     it('should get current user', () => {
  //       return pactum
  //         .spec()
  //         .get('/users/me')
  //         .withHeaders({ Authorization: 'Bearer $S{userAt}' }) //example using a saved variable in pactum
  //         .expectStatus(200);
  //     });
  //   });
  //   describe('Edit user:', () => {
  //     const dto: EditUserDto = {
  //       firstName: 'vladimir',
  //     };
  //     it('should edit user', () => {
  //       return pactum
  //         .spec()
  //         .patch('/users')
  //         .withHeaders({ Authorization: 'Bearer $S{userAt}' }) //example using a saved variable in pactum
  //         .withBody(dto)
  //         .expectStatus(200)
  //         .inspect(); //prints the result in yellow
  //     });
  //   });
  // describe('Bookmark', () => {
  // describe('Get empty bookmarks', () => {
  //   it('get empty bookmarks', () => {
  //     return pactum
  //       .spec()
  //       .get('/bookmarks')
  //       .withHeaders({ Authorization: 'Bearer $S{userAt}' }) //example using a saved variable in pactum
  //       .expectStatus(200)
  //       .expectBody([]);
  //   });
  // });
  // describe('Create Bookmark', () => {
  //   const dto: CreateBookmarkDto = {
  //     title: 'harry potter and something',
  //     description: '500 points to griffindor',
  //     link: 'avada kadavera',
  //   };
  //   it('Should create bookmark', () => {
  //     return pactum
  //       .spec()
  //       .post('/bookmarks')
  //       .withHeaders({ Authorization: 'Bearer $S{userAt}' })
  //       .withBody(dto)
  //       .expectStatus(201)
  //       .inspect();
  //   });
  // });

  // describe('Bookmarks', () => {
  //   describe('Get empty bookmarks', () => {
  //     it('should get bookmarks', () => {
  //       return pactum
  //         .spec()
  //         .get('/bookmarks')
  //         .withHeaders({
  //           Authorization: 'Bearer $S{userAt}',
  //         })
  //         .expectStatus(200)
  //         .expectBody([]);
  //     });
  //   });

  //   describe('Create bookmark', () => {
  //     const dto: CreateBookmarkDto = {
  //       title: 'First Bookmark',
  //       link: 'https://www.youtube.com/watch?v=d6WC5n9G_sM',
  //     };
  //     it('should create bookmark', () => {
  //       return pactum
  //         .spec()
  //         .post('/bookmarks')
  //         .withHeaders({
  //           Authorization: 'Bearer $S{userAt}',
  //         })
  //         .withBody(dto)
  //         .expectStatus(201);
  //         // .stores('bookmarkId', 'id');
  //     });
  //   });

  //   describe('Get bookmarks', () => {
  //     it('should get bookmarks', () => {
  //       return pactum
  //         .spec()
  //         .get('/bookmarks')
  //         .withHeaders({
  //           Authorization: 'Bearer $S{userAt}',
  //         })
  //         .expectStatus(200)
  //         .expectJsonLength(1);
  //     });
  //   });
  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'vlad@gmail.com',
      password: '123',
    };
    describe('Signup', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });

    describe('Signin', () => {
      it('should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('should throw if no body provided', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200);
      });
    });

    describe('Edit user', () => {
      it('should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Vladimir',
          email: 'vlad@codewithvlad.com',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });

  describe('Bookmarks', () => {
    describe('Get empty bookmarks', () => {
      it('should get bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });

    describe('Create bookmark', () => {
      const dto: CreateBookmarkDto = {
        title: 'First Bookmark',
        link: 'https://www.youtube.com/watch?v=d6WC5n9G_sM',
      };
      it('should create bookmark', () => {
        return pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .withBody(dto)
          .expectStatus(201);
        // .stores('bookmarkId', 'id');
      });
    });

    describe('Get bookmarks', () => {
      it('should get bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(200)
          .expectJsonLength(1);
      });
    });
    it.todo('get bookmark by id');
    it.todo('get bookmark by id');
    it.todo('edit bookmark');
    it.todo('delete bookmark');
  });
});
