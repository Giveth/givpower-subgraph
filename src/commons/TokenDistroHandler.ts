import { Address } from '@graphprotocol/graph-ts/common/numbers';
import { TokenDistro } from '../types/schema';
import { TokenDistro as TokenDistroContract } from '../types/TokenDistro/TokenDistro';
import { log } from '@graphprotocol/graph-ts';

// const isContractInfoInitiated: any = {};

export function getTokenDistro(address: Address): TokenDistro {
  log.info(
    'createTokenDistroContractInfoIfNotExists() has been called: ' +
      address.toHex(),
    [],
  );
  let tokenDistro = TokenDistro.load(address.toHex());

  if (tokenDistro) {
    log.info(
      'createTokenDistroContractInfoIfNotExists() contractInfo existed' +
        address.toHex(),
      [],
    );
    return tokenDistro;
  }
  tokenDistro = new TokenDistro(address.toHex());

  const contract = TokenDistroContract.bind(address);
  tokenDistro.lockedAmount = contract.lockedAmount();
  tokenDistro.startTime = contract.startTime();
  tokenDistro.cliffTime = contract.cliffTime();
  tokenDistro.duration = contract.duration();
  tokenDistro.initialAmount = contract.initialAmount();
  tokenDistro.totalTokens = contract.totalTokens();
  tokenDistro.save();
  return tokenDistro;
}

export function updateContractInfo(address: Address): void {}

export function createOrUpdateTokenDistro(address: Address): TokenDistro {
  log.info(
    'createOrUpdateTokenDistro() has been called: ' + address.toHex(),
    [],
  );

  const tokenDistro = getTokenDistro(address);
  const contract = TokenDistroContract.bind(address);

  tokenDistro.lockedAmount = contract.lockedAmount();
  tokenDistro.startTime = contract.startTime();
  tokenDistro.cliffTime = contract.cliffTime();
  tokenDistro.duration = contract.duration();
  tokenDistro.initialAmount = contract.initialAmount();
  tokenDistro.totalTokens = contract.totalTokens();
  tokenDistro.save();
  return tokenDistro;
}
