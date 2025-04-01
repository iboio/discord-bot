import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Config } from '../../entities/config';
import { Repository } from 'typeorm';

@Injectable()
export class BotConfig {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
  ) {}

  async configExists(guildId: string, feature: string): Promise<boolean> {
    const config = await this.configRepository.findOne({
      where: { guildId, feature },
    });
    return !!config;
  }
  async setConfig(
    guildId: string,
    feature: string,
    type: string,
    value: string,
  ): Promise<Config> {
    let config = await this.configRepository.findOne({
      where: { guildId, feature },
    });

    if (config) {
      config.type = type;
      config.value = value;
      return this.configRepository.save(config);
    } else {
      config = this.configRepository.create({ guildId, feature, type, value });
      return this.configRepository.save(config);
    }
  }
}
