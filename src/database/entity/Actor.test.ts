import { validate } from 'class-validator';
import Actor from './Actor';
import { StringUtil, DateUtil } from '../../utils';

const createActor = (): Actor => {
  const actor: Actor = new Actor();

  actor.name = 'Steve';
  actor.surname = 'McQueen';
  actor.gender = 'M';
  actor.birth_date = new Date('1930-03-24');
  actor.death_date = new Date('1980-11-07');
  actor.profile = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/b8LEJ08B4DMX2gsi5UTsYNRNJee.jpg';

  return actor;
};

describe('Valid Actor', () => {
  test('Should pass validation due to correct values', async () => {
    const actor = createActor();
    const errors = await validate(actor);
    expect(errors.length).toBe(0);
  });
});

describe('Invalid Actor', () => {
  test('Should fail validation due to name minimum length', async () => {
    const actor = createActor();
    actor.name = '';
    const errors = await validate(actor);
    expect(errors.length).toBe(1);
  });
  test('Should fail validation due to name maximum length', async () => {
    const actor = createActor();
    actor.name = StringUtil.generateRandom(129);
    const errors = await validate(actor);
    expect(errors.length).toBe(1);
  });
  test('Should fail validation due to surname minimum length', async () => {
    const actor = createActor();
    actor.surname = '';
    const errors = await validate(actor);
    expect(errors.length).toBe(1);
  });
  test('Should fail validation due to surname maximum length', async () => {
    const actor = createActor();
    actor.surname = StringUtil.generateRandom(129);
    const errors = await validate(actor);
    expect(errors.length).toBe(1);
  });
  test('Should fail validation due to unknown gender', async () => {
    const actor = createActor();
    actor.gender = 'U';
    const errors = await validate(actor);
    expect(errors.length).toBe(1);
  });
  test('Should fail validation due to max birth date reached', async () => {
    const actor = createActor();
    actor.birth_date = DateUtil.tomorrow();
    const errors = await validate(actor);
    expect(errors.length).toBe(1);
  });
  test('Should fail due to invalid birth date type', async () => {
    const actor = createActor();
    actor.birth_date = new Date('2019-2019-2019');
    const errors = await validate(actor);
    expect(errors.length).toBe(1);
  });
  test('Should fail validation due to max death date reached', async () => {
    const actor = createActor();
    actor.death_date = DateUtil.tomorrow();
    const errors = await validate(actor);
    expect(errors.length).toBe(1);
  });
  test('Should fail due to invalid death date type', async () => {
    const actor = createActor();
    actor.death_date = new Date('2019-2019-2019');
    const errors = await validate(actor);
    expect(errors.length).toBe(1);
  });
  test('Should fail validation due to invalid profile URL', async () => {
    const actor = createActor();
    actor.profile = 'htt://invalid.com/profile.jpg';
    let errors = await validate(actor);
    expect(errors.length).toBe(1);
    actor.profile = 'http//invalid.com/profile.jpg';
    errors = await validate(actor);
    expect(errors.length).toBe(1);
    actor.profile = 'http:/invalid.com/profile.jpg';
    errors = await validate(actor);
    expect(errors.length).toBe(1);
  });
});
