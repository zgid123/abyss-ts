import { describe, expect, it, suite } from 'vitest';

import { httpStatusCodes } from '../../constants/httpStatusCodes';

describe('[constants]: httpStatusCodes', () => {
  suite('1xx codes', () => {
    it('should be defined', () => {
      expect(httpStatusCodes.continue).toBe(100);
      expect(httpStatusCodes.switchingProtocols).toBe(101);
      expect(httpStatusCodes.processing).toBe(102);
      expect(httpStatusCodes.earlyHints).toBe(103);
    });
  });

  suite('2xx codes', () => {
    it('should be defined', () => {
      expect(httpStatusCodes.ok).toBe(200);
      expect(httpStatusCodes.created).toBe(201);
      expect(httpStatusCodes.accepted).toBe(202);
      expect(httpStatusCodes.nonAuthoritativeInformation).toBe(203);
      expect(httpStatusCodes.noContent).toBe(204);
      expect(httpStatusCodes.resetContent).toBe(205);
      expect(httpStatusCodes.partialContent).toBe(206);
      expect(httpStatusCodes.multiStatus).toBe(207);
      expect(httpStatusCodes.alreadyReported).toBe(208);
      expect(httpStatusCodes.imUsed).toBe(226);
    });
  });

  suite('3xx codes', () => {
    it('should be defined', () => {
      expect(httpStatusCodes.multipleChoices).toBe(300);
      expect(httpStatusCodes.movedPermanently).toBe(301);
      expect(httpStatusCodes.found).toBe(302);
      expect(httpStatusCodes.seeOther).toBe(303);
      expect(httpStatusCodes.notModified).toBe(304);
      expect(httpStatusCodes.useProxy).toBe(305);
      expect(httpStatusCodes.unused).toBe(306);
      expect(httpStatusCodes.temporaryRedirect).toBe(307);
      expect(httpStatusCodes.permanentRedirect).toBe(308);
    });
  });

  suite('4xx codes', () => {
    it('should be defined', () => {
      expect(httpStatusCodes.badRequest).toBe(400);
      expect(httpStatusCodes.unauthorized).toBe(401);
      expect(httpStatusCodes.paymentRequired).toBe(402);
      expect(httpStatusCodes.forbidden).toBe(403);
      expect(httpStatusCodes.notFound).toBe(404);
      expect(httpStatusCodes.methodNotAllowed).toBe(405);
      expect(httpStatusCodes.notAcceptable).toBe(406);
      expect(httpStatusCodes.proxyAuthenticationRequired).toBe(407);
      expect(httpStatusCodes.requestTimeout).toBe(408);
      expect(httpStatusCodes.conflict).toBe(409);
      expect(httpStatusCodes.gone).toBe(410);
      expect(httpStatusCodes.lengthRequired).toBe(411);
      expect(httpStatusCodes.preconditionFailed).toBe(412);
      expect(httpStatusCodes.payloadTooLarge).toBe(413);
      expect(httpStatusCodes.uriTooLong).toBe(414);
      expect(httpStatusCodes.unsupportedMediaType).toBe(415);
      expect(httpStatusCodes.rangeNotSatisfiable).toBe(416);
      expect(httpStatusCodes.expectationFailed).toBe(417);
      expect(httpStatusCodes.imATeapot).toBe(418);
      expect(httpStatusCodes.misdirectedRequest).toBe(421);
      expect(httpStatusCodes.unprocessableEntity).toBe(422);
      expect(httpStatusCodes.locked).toBe(423);
      expect(httpStatusCodes.failedDependency).toBe(424);
      expect(httpStatusCodes.tooEarly).toBe(425);
      expect(httpStatusCodes.upgradeRequired).toBe(426);
      expect(httpStatusCodes.preconditionRequired).toBe(428);
      expect(httpStatusCodes.tooManyRequests).toBe(429);
      expect(httpStatusCodes.requestHeaderFieldsTooLarge).toBe(431);
      expect(httpStatusCodes.unavailableForLegalReasons).toBe(451);
    });
  });

  suite('5xx codes', () => {
    it('should be defined', () => {
      expect(httpStatusCodes.internalServerError).toBe(500);
      expect(httpStatusCodes.notImplemented).toBe(501);
      expect(httpStatusCodes.badGateway).toBe(502);
      expect(httpStatusCodes.serviceUnavailable).toBe(503);
      expect(httpStatusCodes.gatewayTimeout).toBe(504);
      expect(httpStatusCodes.httpVersionNotSupported).toBe(505);
      expect(httpStatusCodes.variantAlsoNegotiates).toBe(506);
      expect(httpStatusCodes.insufficientStorage).toBe(507);
      expect(httpStatusCodes.loopDetected).toBe(508);
      expect(httpStatusCodes.notExtended).toBe(510);
      expect(httpStatusCodes.networkAuthenticationRequired).toBe(511);
    });
  });
});
