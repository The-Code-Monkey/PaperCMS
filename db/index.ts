import config from '../orchard.theme.config.json';

const DB = async () => {
    switch(config.dbProvider) {
        case "supabase":
        default: {
            return (await import('./supabase')).default;
        }
    }
}

export default DB;