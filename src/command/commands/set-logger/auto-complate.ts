import { Injectable } from '@nestjs/common';
import { AutocompleteInterceptor } from 'necord';
import { AutocompleteInteraction } from 'discord.js';
import { ConstantService } from '../../../constant/constant.service';

@Injectable()
export class SetLoggerAutoCompleteInterceptor extends AutocompleteInterceptor {
  constructor(private readonly constantService: ConstantService) {
    super();
  }
  public transformOptions(interaction: AutocompleteInteraction) {
    const focused = interaction.options.getFocused(true);
    let choices: string[];
    if (focused.name === 'type') {
      choices = this.constantService.logChannelChoice;
    }
    return interaction.respond(
      choices
        .filter((choice) => choice.startsWith(focused.value.toString()))
        .map((choice) => ({ name: choice, value: choice })),
    );
  }
}
