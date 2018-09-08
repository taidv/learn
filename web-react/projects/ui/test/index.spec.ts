import { expect } from 'chai';
import * as sinon from 'sinon';

describe('Example Test', () => {
    let stub: sinon.SinonStub;

    beforeEach(() => {
        stub = sinon.stub(String.prototype, 'charAt');
    });

    afterEach(() => {
        stub.restore();
    });

    it('example', () => {
        const result = '!';
        stub.callsFake(() => {
            return result;
        });
        const test = String('test');
        // tslint:disable-next-line:no-unused-expression
        expect(test).not.be.null;
        expect(test.charAt(42)).to.be.equal(result);
    });
});
