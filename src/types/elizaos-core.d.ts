declare module "@elizaos/core" {
    // Logger
    export const elizaLogger: {
        debug: (message: string, ...args: any[]) => void;
        info: (message: string, ...args: any[]) => void;
        warn: (message: string, ...args: any[]) => void;
        error: (message: string, ...args: any[]) => void;
    };

    // Action types
    export interface ActionResult {
        result: string;
        success: boolean;
        data?: any;
        error?: string;
    }

    export interface Context {
        messages: any[];
        memory: any;
        // Add other context properties as needed
    }

    export interface IActionDefinition {
        name: string;
        description: string;
        parameters: Record<string, any>;
        required: string[];
        handler: (context: Context, params: any) => Promise<ActionResult>;
    }

    // Plugin type
    export interface Plugin {
        name: string;
        version: string;
        description: string;
        actions?: IActionDefinition[];
        configSchema?: any;
        initialize?: (config: any) => Promise<void>;
    }
}
