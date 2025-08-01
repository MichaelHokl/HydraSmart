'use strict'

export const signups = [];

export function addSignup (signup){
    signups.push(signup);
    console.log('Current signups:', signups);
}
