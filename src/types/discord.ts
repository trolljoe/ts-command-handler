import type {
    AnySelectMenuInteraction,
    ApplicationCommandOption,
    ButtonInteraction,
    ChatInputCommandInteraction,
    MessageContextMenuCommandInteraction,
    ModalSubmitInteraction,
    SelectMenuComponentOptionData,
    UserContextMenuCommandInteraction,
} from "discord.js";

// Adjusted Command type
export type Command =
    | {
          role: "CHAT_INPUT";
          run: (interaction: ChatInputCommandInteraction) => unknown;
          name: string;
          name_localizations?: Record<string, string>;
          description: string;
          description_localizations?: Record<string, string>;
          options?: ApplicationCommandOption[];
          default_member_permissions?: string;
          nsfw?: boolean;
          integration_types?: number[];
          contexts?: number[];
      }
    | {
          role: "MESSAGE_CONTEXT_MENU";
          run: (interaction: MessageContextMenuCommandInteraction) => unknown;
          name: string;
          name_localizations?: Record<string, string>;
          description: string;
          description_localizations?: Record<string, string>;
          options?: ApplicationCommandOption[];
          default_member_permissions?: string;
          nsfw?: boolean;
          integration_types?: number[];
          contexts?: number[];
      }
    | {
          role: "USER_CONTEXT_MENU";
          run: (interaction: UserContextMenuCommandInteraction) => unknown;
          name: string;
          name_localizations?: Record<string, string>;
          description: string;
          description_localizations?: Record<string, string>;
          options?: ApplicationCommandOption[];
          default_member_permissions?: string;
          nsfw?: boolean;
          integration_types?: number[];
          contexts?: number[];
      }
    | {
          role: "SELECT_MENU";
          custom_id: string;
          run: (interaction: AnySelectMenuInteraction) => unknown;
      }
    | {
          role: "BUTTON";
          custom_id: string;
          run: (interaction: ButtonInteraction) => unknown;
      }
    | {
          role: "MODAL_SUBMIT";
          custom_id: string;
          run: (interaction: ModalSubmitInteraction) => unknown;
      };

export type CommandNoRun = Omit<Command, "run">;
