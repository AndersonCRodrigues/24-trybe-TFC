import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
const { expect } = chai;
// @ts-ignore
import chaiAsPromised = require('chai-as-promised');
import TeamService from '../services/Team.service';
import TeamModel from '../database/models/Team.model';


chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('Teams Service', () => {

  afterEach(() => {
    Sinon.restore();
  });

  describe('getAll', () => {
    it('Deve retornar uma lista de todos os teams', async () => {
      Sinon.stub(TeamModel, 'findAll').resolves([]);

      expect(await TeamService.getAll()).to.be.deep.equal([]);
    })
  })
  describe('getOne', () => {
    it('Deve retornar um objeto com Team', async () => {
      // @ts-ignore
      Sinon.stub(TeamModel, 'findByPk').resolves({id: 1, teamName: 'name'});
      expect(await TeamService.getOne(1)).to.be.deep.equal({id: 1, teamName: 'name'});
    });
    it('Deve retorn erro se não encontrar o time', async () => {
      Sinon.stub(TeamModel, 'findByPk').resolves();

      expect(TeamService.getOne(1)).to.be.rejectedWith('There is no team with such id!');
    })
  });
})