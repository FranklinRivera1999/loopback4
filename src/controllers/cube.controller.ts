import {repository} from '@loopback/repository';
import {
  del,
  getModelSchemaRef,
  HttpErrors, param,
  post,
  requestBody
} from '@loopback/rest';
import {CubeRepository} from '../repositories';
import {cubeSchema} from '../schemas/cube.schema';
import {SpaceService} from '../services/space.service';

const REGION = 'nyc3'
const BUCKET = process.env.BUCKET_NAME

export class CubeController {
  spaceService: SpaceService
  constructor(
    @repository(CubeRepository)
    public cubeRepository: CubeRepository,
  ) {
    this.spaceService = new SpaceService()
  }

  @post('/api/cubes/getUrlUpload', {
    responses: {
      '200': {
        description: 'Url Upload Image with Url',
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(cubeSchema),
        },
      },
    })
    cube: cubeSchema,
  ): Promise<any> {
    return {
      url: this.spaceService.getUrlUpload(cube.key, 2 * 60),
      link: `https://${BUCKET}.${REGION}.digitaloceanspaces.com/${cube.key}`
    }
  }


  @del('/api/cubes/{id}', {
    responses: {
      '204': {
        description: 'Cube DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {

    let cube = await this.cubeRepository.findById(id)
    if (!cube) throw new HttpErrors.NotFound('Cube not Found')
    if (cube.key) this.spaceService.deleteFile(cube.key)
    await this.cubeRepository.deleteById(id);
  }
}
