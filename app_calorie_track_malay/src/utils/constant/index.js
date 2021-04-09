const api_base_url = 'http://localhost/';
const app_brand = "SehatKu"
const app_name = "A calorie tracking and wellness app"
const Key_userdata = "Key_userdata"; // local db key

// questions
const q_goal = [{ key: "lose-weight", name: "Lose weight" },
{ key: "maintain-weight", name: "Maintain weight" },
{ key: "gain-weight", name: "Gain weight" },]

const q_goal_reason = [{ key: "to-have-more-weight", name: "To have more energy." },
{ key: "to-feel-good-in-my-body", name: "To feel good in my body." },
{ key: "to-be-able-to-physically-do-more", name: "To be able to physically do more." },
{ key: "do-take-fewer-medications", name: "Do take fewer medications." },
{ key: "to-have-more-fewer-confidence", name: "To have more confidence."},
{ key: "to-be-healthier", name: "To be healthier." },]

const q_target_weight_loss = [{ key: "0.25kg-per-week", name: "0.25kg per week" },
{ key: "0.50kg-per-week", name: "0.50kg per week" },
{ key: "0.75kg-per-week", name: "0.75kg per week" },
{ key: "1.00kg-per-week", name: "1.00kg per week" },]

const q_medical_condition = [
{ key: "No, I have no med conditions", name: "No, I have no med conditions" },
{ key: "High blood pressure", name: "High blood pressure" },
{ key: "High blood sugar", name: "High blood sugar" },
{ key: "Cholesterol", name: "Cholesterol" },
{ key: "PCOS, endometriosis..", name: "PCOS, endometriosis.." },
{ key: "I am pregnant/ breastfeeding", name: "I am pregnant/ breastfeeding" },
{ key: "Other", name: "Other" },]

const q_sleep = [
{ key: "No, I sleep well", name: "No, I sleep well" },
{ key: "Difficulty falling asleep", name: "Difficulty falling asleep" },
{ key: "Waking up tired", name: "Waking up tired" },
{ key: "Waking up during the night", name: "Waking up during the night" },
{ key: "Insomnia", name: "Insomnia" },
{ key: "Lack of sleep schedule", name: "Lack of sleep schedule" },
{ key: "Other", name: "Other" },]

// colors
const C_BG_WHITE = "#DCDCDC";

const C_BLACK_0 = '#FFFFFF';
const C_BLACK_5 = '#FDFDFD';
const C_BLACK_10 = '#F6F6F6';
const C_BLACK_20 = '#E6E6E6';
const C_BLACK_30 = '#CCCCCC';
const C_BLACK_40 = '#C4C4C4';
const C_BLACK_50 = '#999999';
const C_BLACK_60 = '#666666';
const C_BLACK_70 = '#4D4D4D';
const C_BLACK_80 = '#333333';
const C_BLACK_90 = '#1A1A1A';
const C_BLACK_100 = '#010101';

const C_BLUE_5 = '#F8FAFF';
const C_BLUE_10 = '#F0F4FF';
const C_BLUE_30 = '#5789F4';
const C_BLUE_40 = '#759CF5';
const C_BLUE_50 = '#4779F1';
const C_BLUE_80 = '#1757EE';

const C_RED_50 = '#FF477C';
const C_TEAL_50 = '#39C6B8';
const C_YELLOW_30 = '#FAA500';
const C_YELLOW_50 = '#F7BA1E';

export default {
    api_base_url,
    app_brand,
    app_name,
    Key_userdata,
    //////////
    q_goal, 
    q_goal_reason,
    q_target_weight_loss,
    q_medical_condition,
    q_sleep,
    //////////
    C_BG_WHITE,
    C_RED_50,
    C_BLUE_5,
    C_BLUE_10,
    C_BLUE_30,
    C_BLUE_40,
    C_BLUE_50,
    C_BLUE_80,
    C_BLACK_0,
    C_BLACK_5,
    C_BLACK_10,
    C_BLACK_20,
    C_BLACK_30,
    C_BLACK_40,
    C_BLACK_50,
    C_BLACK_60,
    C_BLACK_70,
    C_BLACK_80,
    C_BLACK_90,
    C_BLACK_100,
    C_TEAL_50,
    C_YELLOW_30,
    C_YELLOW_50,
};
