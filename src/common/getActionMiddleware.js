import cm from './CommunicationManager'

export const getActionMiddleware = store => next => action => {
	  //Save current action
	  cm.setValue("currentAction", action);
	
	
	return next(action)
}
	
